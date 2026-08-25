---
name: funbytes-testing
description: Quality assurance standards, test matrix, and testing conventions across the FunBytes monorepo.
---

# FunBytes Testing Skill

## Purpose
Establishes the testing methodology, edge cases to cover, and automation requirements for FunBytes.

## When to Use It
- Writing unit, integration, or store tests before submitting pull requests.
- Validating parser resilience and ranking score accuracy.

## Test Matrix
1. **Source Adapters**:
   - Resilience against timeout, network errors, 429 rate limits, and 500 server errors.
   - Parsing of empty arrays, malformed JSON, and unexpected XML schema alterations.
2. **Ranking & Recommendation**:
   - Priority verification: Developer articles top feed for users who selected Developers.
   - Recency calculation verification: Fresh news beats decayed older news.
   - Engagement logarithmic weight verification.
3. **Deduplication Engine**:
   - Matching title variants with similarity > 72%.
   - Preserving multi-source coverage metadata.
4. **Client State & Stores**:
   - Optimistic like increment and rollback on failure.
   - Bookmark category grouping and persistence.
   - Onboarding state transition and interest selection.

## Test Commands
```bash
# Backend unit tests
cd backend && npm test

# Mobile unit & store tests
cd apps/mobile && npm test
```
