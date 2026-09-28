# M17 Adaptive Learning Specification

The adaptive engine consumes observed student attempts and emits a learning plan. It does not mutate curriculum source content.

Decision bands:
- <60%: REVIEW_LESSON
- 60–74%: PRACTICE
- 75–89%: ASSESSMENT
- ≥90%: CHALLENGE

Confidence is capped at 1.0 and grows with evidence (25 attempts for full confidence).
