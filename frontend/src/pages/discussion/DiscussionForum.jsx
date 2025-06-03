import React from "react";
import CreatePost from "./CreatePost";
import Feed from "./Feed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyPosts from "./MyPosts";

function DiscussionForum() {
  return (
    <div className="max-w-7xl mx-auto flex">
      <div className="w-[400px] ">
        <CreatePost />
      </div>
      <div className="w-full">
        <Tabs defaultValue="feed" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="myPosts">My Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="feed">
            <Feed />
          </TabsContent>
          <TabsContent value="myPosts">
            <MyPosts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default DiscussionForum;
