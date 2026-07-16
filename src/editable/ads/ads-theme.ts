// Ads theme — vaboulus-aligned. Style only; shape/fit stays locked in ad-slots.ts.

import type { AdSkin } from '@/lib/ads/ad-frame'

export const adSkin: AdSkin = {
  radius: '16px',
  border: '1px solid rgba(14,14,14,0.10)',
  shadow: '0 1px 2px rgba(0,30,44,0.04)',
  background: '#ffffff',
  labelClassName: 'bg-[#fc6736] text-white',
}

export const adSkinBySlot: Partial<Record<string, AdSkin>> = {
  sidebar: { radius: '14px', shadow: 'none' },
  popup: { radius: '20px' },
  header: { radius: '18px', background: '#fafafa' },
  rail: { radius: '14px' },
  feature: { radius: '18px' },
  interstitial: { radius: '20px', shadow: '0 20px 60px rgba(0,30,44,0.35)' },
  anchor: { radius: '12px', shadow: '0 6px 24px rgba(0,30,44,0.15)' },
  'in-feed': { radius: '16px' },
}

export function skinFor(slot: string): AdSkin {
  return { ...adSkin, ...(adSkinBySlot[slot] ?? {}) }
}
