import React from 'react';
import { Button, Space } from 'antd';

function App() {
  return (
    <div>
      <h1>Dzix's Library</h1>
      <Space wrap>
    <Button type="primary">Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </Space>
    </div>
  );
}

export default App;
