#!/usr/bin/env node
/**
 * Prints an Apple Music developer token to stdout. Used two ways:
 *
 *   1. Locally, to test `npm run now` against the real Apple Music API
 *      before wiring up GitHub secrets.
 *   2. Pasted into apple-music-authorize.html for the one-time Music User
 *      Token handshake described there.
 *
 * Reads the team ID and key ID, plus either the .p8 file's contents or a
 * path to it:
 *
 *   APPLE_MUSIC_TEAM_ID=ABCD123456 \
 *   APPLE_MUSIC_KEY_ID=XYZ9876543 \
 *   APPLE_MUSIC_PRIVATE_KEY_PATH=./AuthKey_XYZ9876543.p8 \
 *   node scripts/apple-music-dev-token.mjs
 */
import { readFileSync } from 'node:fs'
import { createAppleDeveloperToken } from './lib/apple-music-token.mjs'

const teamId = process.env.APPLE_MUSIC_TEAM_ID
const keyId = process.env.APPLE_MUSIC_KEY_ID
const privateKey =
  process.env.APPLE_MUSIC_PRIVATE_KEY ||
  (process.env.APPLE_MUSIC_PRIVATE_KEY_PATH && readFileSync(process.env.APPLE_MUSIC_PRIVATE_KEY_PATH, 'utf8'))

if (!teamId || !keyId || !privateKey) {
  console.error('Set APPLE_MUSIC_TEAM_ID, APPLE_MUSIC_KEY_ID, and APPLE_MUSIC_PRIVATE_KEY(_PATH).')
  process.exit(1)
}

// Long-lived (Apple's 6-month max) because this one is for manual use, not
// a single CI run — you don't want it expiring mid-copy-paste.
console.log(createAppleDeveloperToken({ teamId, keyId, privateKey, expiresInSeconds: 60 * 60 * 24 * 150 }))
