# Live Story JavaScript SDK

<div align="center">
    <h1 align="center">JavaScript Client for Live Story's Delivery API</h1>
    <p align="center">This client is a thin wrapper for the <a href="https://developers.livestory.io/api" target="_blank">Live Story</a> API's to use in Node.js and the browser.</p>
</div>

## Installation

```sh
npm install livestory-js-sdk # yarn add livestory-js-sdk
```



#### Compatibility

| Version to install                                                                                                            | Support                                              |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Latest livestory-js-sdk                                                                                                    | Modern browsers + Node 18+                           |

## How to use it

### Using the Content Delivery API

For access token generation, refer to the [Developer Documentation](https://livestory.nyc/eu/documentation/articles/developer-documentation/index.html)

```javascript
// 1. Import the LiveStory client
import LiveStoryClient from "livestory-js-sdk";

// 2. Initialize the client using the access token generated 
// in your Live Story dashboard at https://design.livestory.io
const Livestory = new LiveStoryClient({
  accessToken: <YOUR_ACCESS_TOKEN>
});
```

## Code examples

```javascript
// Get layouts by folder id
try {
  const response = await Livestory.getLayouts({ folder_id: 'your_folder_id' });

  console.log(response.items);
} 
catch (err) {
  const lsErr = err as ILsError;
  console.error('Error fetching layouts:', lsErr.status, lsErr.message);
}
```

```javascript
// Get layouts by attribute(s)
try {
  const response = await Livestory.getLayouts({ 
    filter_query:  {
      myfield: {
          in: 'value1,value2'
      }
    }
  });

  console.log(response.items);
} 
catch (err) {
  const lsErr = err as ILsError;
  console.error('Error fetching layouts:', lsErr.status, lsErr.message);
}
```



