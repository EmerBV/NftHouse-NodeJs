# NftHouse

Development of an API that will use the server of a platform for the sale of NFTs (Non-Fungible Tokens).

The API will provide the items that are for sale and will allow you to filter those items by their Id, price or category.

It will also allow listing new items or removing them from the platform.


## API usage methods

To begin we must locate ourselves in the root folder of the project:

```sh
cd nfthouse
```

To start the application use:

```sh
npm install
```

Next we need to load our database:

```sh
nodemon initDB.js
```

In production:

```sh
npm start
```

In development:

```sh
npm run dev
```


## API access via routes

List of all NFTs:

- http://localhost:3000/api/nfts

Find an NFTs by ID:

- http://localhost:3000/api/nfts/id

Create an NFT sale ad:

- POST /api/nfts

Delete an NFT:

- DELETE /api/nfts/:id

## Examples of a request with filters

By price range and category:

http://localhost:3000/?sort=name&lowestPrice=0.1&category=art&limit=3

Search by category:

http://localhost:3000/category/photography

## Front-end requests

We can only filter the items by category by clicking on the drop-down button