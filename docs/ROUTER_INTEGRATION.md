# React Router DOM Integration

This document outlines the approach for extracting react-router-dom integration from PR #194 into a standalone, reviewable change.

## Background

PR #194 added react-router-dom support alongside other changes (TransactionStore, config.js). This extraction isolates the routing functionality so it can be reviewed and merged independently.

## Integration Points

### 1. Router Setup
The app should be wrapped with the React Router provider. Add to `src/index.js`:
```jsx
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

### 2. Route Definitions
Replace conditional rendering with declarative routes. In `src/App.js`, replace the current switch/case navigation with:
```jsx
import { Routes, Route } from 'react-router-dom';

// Inside the render method:
<Routes>
  <Route path="/" element={<MainCard ... />} />
  <Route path="/receive" element={<Receive ... />} />
  <Route path="/send" element={<SendToAddress ... />} />
  <Route path="/send/by-scan" element={<SendByScan ... />} />
  <Route path="/apps" element={<Apps ... />} />
  <Route path="/advanced" element={<Advanced ... />} />
  <Route path="/exchange" element={<Exchange ... />} />
  <Route path="/cashout" element={<CashOut ... />} />
</Routes>
```

### 3. Navigation
Replace direct state changes with router navigation:
```jsx
import { useNavigate } from 'react-router-dom';

// Instead of this.setState({ page: 'send' })
const navigate = useNavigate();
navigate('/send');
```

### 4. History Management
Browser back/forward buttons will work automatically with react-router-dom — no need for custom history state management.

## Migration Strategy
1. **Phase 1**: Add `react-router-dom` dependency, wrap app in `BrowserRouter`
2. **Phase 2**: Replace page-switch logic with `<Routes>`
3. **Phase 3**: Update navigation calls from `setState` to `navigate()`
4. **Phase 4**: Remove custom history/page state management

Each phase can be a separate, reviewable PR.
