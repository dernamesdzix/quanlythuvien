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
        <TabPane tab="Patrons" key="2">
          <Users role="patron" />
        </TabPane>
        <TabPane tab="Librarians" key="3">
          <Users role="librarian" />
        </TabPane>
        <TabPane tab="Admins" key="4">
          <Users role="admin" />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
