# YAKV - Yet Another Key-Value Store

![NPM Version](https://img.shields.io/npm/v/yakv)
![Tests Status](https://github.com/w666/yakv/actions/workflows/nodejs.yaml/badge.svg)

YAKV is very simple storage that can be used inside our application or as a standalone redis-like storage.

YAKV consists of two modules:

-   KV storage that can be used as a local in-memory store
-   Web server to access KV storage over RESTful API

## Table of Contents

-   [Features](#features)
-   [Local Storage](#local-storage)
    -   [Parameters](#parameters)
    -   [Create New Storage](#create-new-storage)
    -   [Add Value](#add-value)
    -   [Get Value](#get-value)
    -   [Get Current Storage Size](#get-current-storage-size)
    -   [Get Max Storage Size](#get-max-storage-size)
    -   [Get Default TTL](#get-default-ttl)
    -   [Delete Expired Values](#delete-expired-values)
-   [HTTP Server](#http-server)
-   [RESTful API](#restful-api)
    -   [Health](#health)
    -   [Read Value](#read-value)
    -   [Add Value](#add-value-1)
    -   [Add Value With TTL](#add-value-with-ttl)

## Features

-   Keys can be strings or number
-   Value can be anything
-   Global TTL (expire time)
-   Per-key TTL (expire time)
-   RESTful API
-   Key can't be replaced until expired

## Local Storage

### Parameters

`maxStorageSize`: Optional. Max number of key/values. Default value is 1000000.

`defaultTTL`: Optional. TTL for values if not set on create. Default value is 60000. Value is in milliseconds.

### Create Storage

To create new storage with default parameters

```typescript
const store = new KVStore();
```

Set max number of key/values to 1000

```typescript
const store = new KVStore(1000);
```

Set max number of key/values to 1000 and default TTL to 5 seconds

```typescript
const store = new KVStore(1000, 5000);
```

### Add Value

`ttl` is optional parameter

```typescript
const res1 = store.set('key1', { someData: 'test data' });
console.log(res1); // prints `true`, value added

const res2 = store.set('key1', { someData: 'new data' });
console.log(res2); // prints `false`, value not added as current values TTL is not expired yet

// wait TTL to expire

const res3 = store.set('key1', { someData: 'new data' });
console.log(res3); // prints `true`, value overridden because TTL expired
```

### Get Value

```typescript
const res1 = store.get('key1');
console.log(res1); // prints value `{ someData: 'test data' }`

const res2 = store.get('key2');
console.log(res2); // prints `undefined`, because key not found in storage
```

### Get Current Storage Size

```typescript
const store = new KVStore();
const res1 = store.set('key1', 'foo');
store.getSize(); // returns 1
```

### Get Max Storage Size

```typescript
const store = new KVStore(1000);
store.getMaxStorageSize(); // returns 100
```

### Get Default TTL

```typescript
const store = new KVStore(1000, 5000);
store.getDefaultTTL(); // returns 5000
```

### Delete Expired Values

```typescript
const store = new KVStore();
store.cleanUp();
```

## HTTP Server

When new instance is created it also creates in-memory storage with the same parameters passed to HTTP server.

### Parameters

`maxStorageSize`: Optional. Max number of key/values. Default value is 1000000.

`defaultTTL`: Optional. TTL for values if not set on create. Default value is 60000. Value is in milliseconds.

`port`: Optional. Port to listen to. Default value is 8080.

### Create And Start Server

To create new storage with default parameters

```typescript
const server = new KVServer();
```

Once server is created it can be started, so it will start listening for requests

```typescript
server.start();
```

Some parameters can be passed to change server defaults, as per example below server is created with storage size `10`, `10` seconds TTL and will be listening on port `8081`.

```typescript
const server = new KVServer(10, 10000, 8081);
```

### Stop Server

In cases when server should be gracefully stopped it has async `stop` method

```typescript
await server.stop();
```

### Internal Express Instance

There is a `getinstance` method to get access to internal express instance

```typescript
server.getInstance();
```

### Delete Expired Values

There is a `crealUp` method to delete expired values from internal storage, it basically executes `cleanUp` against internal storage instance.

```typescript
server.cleanUp();
```

## RESTful API

### Health

To get current storage state

`GET` /kv/v1/health

Example response:

```json
{
    "defaultTTL": 60000,
    "maxStorageSize": 1000000,
    "storageUsed": 0
}
```

### Read Value

To read value by key

`GET` /kv/v1/get/:key

If key exists then response will contain value

```json
{
    "data": "foo"
}
```

Otherwise value will be `null`

```json
{
    "data": null
}
```

### Add Value

`PUT` /kv/v1/put/:key

If value successfully added or overridden because TTL expired then response will be

```json
{
    "created": true
}
```

otherwise `false`

```json
{
    "created": false
}
```

### Add Value With TTL

`PUT` /kv/v1/put/:key/:ttl
