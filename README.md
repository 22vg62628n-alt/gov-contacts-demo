# gov-contacts-demo

## Run

- `npm install`
- `npm run dev`

## Data Provider Switch

Project supports adapter-based provider switching for governance APIs.

- `mock` provider (default): localStorage-backed demo data.
- `real` provider is currently blocked by product baseline and falls back to `mock`.

Configure with `.env`:

```bash
VITE_DATA_PROVIDER=mock
VITE_ENABLE_SEED_DATA=true
```
