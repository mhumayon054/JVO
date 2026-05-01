# Multi-Tenant Bidding Platform - Real-World Risks and Mitigations

## Common production failures

1. Bid race condition near auction close  
Mitigation:
- Use server-side authoritative clock.
- Use transactional write path for bid acceptance.
- Enforce optimistic locking/version checks.

2. Duplicate order/payment after auction win  
Mitigation:
- Idempotency keys on payment and order creation.
- Exactly-once settlement state machine (or de-dup guard table).

3. Cross-tenant data exposure  
Mitigation:
- Tenant-scoped query guards in repository layer.
- RLS / policy checks for every data path.
- Security tests with tenant boundary assertions.

4. Notification storms and delayed winner emails  
Mitigation:
- Queue-based notification pipeline with retries/backoff.
- Dead-letter queue for failed notifications.
- Template-level fallback messaging.

5. Fraudulent bidding patterns  
Mitigation:
- Rate limits per user/IP/tenant.
- Risk scoring on unusual bid velocity and account age.
- Manual review queue for suspicious winners.

## MVP non-functional targets

- P95 bid submit latency: < 500 ms under expected load
- Auction close consistency: no accepted late bids after close event
- Tenant isolation: zero cross-tenant read/write defects
- Recovery objective: restore core bidding in < 30 minutes

## Suggested architecture controls

- Append-only bid event log for auditability.
- Materialized "current highest bid" projection for fast reads.
- Background reconciliation job for payment and order states.
- Health checks and circuit breakers for third-party dependencies.

## Product constraints to ask before final architecture

- Max concurrent auctions per tenant
- Peak bids per second target
- Regulatory constraints (PCI, SOC2, regional data laws)
- Allowed cloud providers / existing vendor contracts
- SLA and support expectations
