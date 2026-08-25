# FunBytes Database Schema & Data Models

FunBytes uses a normalized relational data model, supporting both high-speed key-value cache access and relational query integrity.

```text
┌─────────────────┐       ┌──────────────────┐
│      User       │◄──────┤   UserInterest   │
│ id              │       │ userId           │
│ username        │       │ topicId          │
│ email           │       └──────────────────┘
│ feedStyle       │
└────────┬────────┘
         │
         │                ┌──────────────────┐
         ├───────────────►│    Bookmark      │
         │                │ id               │
         │                │ userId           │
         │                │ contentId        │
         │                │ folderCategory   │
         │                └──────────────────┘
         │
         │                ┌──────────────────┐
         ├───────────────►│    ContentLike   │
         │                │ userId           │
         │                │ contentId        │
         │                └──────────────────┘
         │
         │                ┌──────────────────┐
         └───────────────►│     Comment      │
                          │ id               │
                          │ contentId        │
                          │ userId           │
                          │ parentId         │
                          │ text             │
                          │ likesCount       │
                          └──────────────────┘

┌─────────────────┐       ┌──────────────────┐
│     Source      │◄──────┤   ContentItem    │
│ id              │       │ id               │
│ name            │       │ sourceId         │
│ url             │       │ title            │
│ category        │       │ summary          │
│ enabled         │       │ articleUrl       │
│ refreshInterval │       │ imageUrl         │
└─────────────────┘       │ publishedAt      │
                          │ category         │
                          │ contentType      │
                          │ likesCount       │
                          │ commentsCount    │
                          │ sharesCount      │
                          └──────────────────┘
```
