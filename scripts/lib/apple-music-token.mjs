import { createSign } from 'node:crypto'

const base64url = (input) => Buffer.from(input).toString('base64url')

/**
 * Signs an Apple Music API developer token: a JWT, ES256, from the MusicKit
 * private key Apple hands you as a .p8 file.
 *
 * Node's crypto defaults to DER-encoded ECDSA signatures; a JWS needs the raw
 * r||s concatenation instead. `dsaEncoding: 'ieee-p1363'` produces that
 * directly, which is the only reason this doesn't need a JWT dependency.
 *
 * Apple caps `exp` at 6 months from `iat`. This token is minted fresh on
 * every CI run and used once, so the default below is intentionally short —
 * there's no reason for a token this narrowly used to outlive the job.
 */
export function createAppleDeveloperToken({ teamId, keyId, privateKey, expiresInSeconds = 300 }) {
  if (!teamId || !keyId || !privateKey) {
    throw new Error('createAppleDeveloperToken requires teamId, keyId, and privateKey')
  }

  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'ES256', kid: keyId }
  const payload = { iss: teamId, iat: now, exp: now + expiresInSeconds }
  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`

  const signature = createSign('sha256')
    .update(signingInput)
    .sign({ key: privateKey, dsaEncoding: 'ieee-p1363' })

  return `${signingInput}.${signature.toString('base64url')}`
}

export default createAppleDeveloperToken
