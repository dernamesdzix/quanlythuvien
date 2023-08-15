import React from "react";
import { Tabs } from "antd";
import Books from "./Books";
import Users from "./Users";

const TabPane = Tabs.TabPane;

function Profile() {
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Books" key="1">
          <Books />
        </TabPane>
        <TabPane tab="Users" key="2">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
