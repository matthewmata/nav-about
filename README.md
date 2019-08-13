# Grubhub System Design
> Scaled up on AWS EC2 instances

![](microservice.png)

Result: 4500 request per second within 0.1 % of error rate

- Inherited front-end codebase and scaled up on AWS EC2 instances
- Populated 10M fake product data with Node.js Streams and seeded on MongoDB
- Benchmarked MongoDB and Postgres, and got a better result with MongoDB in terms of latency and error rate under high traffic
- Optimized Nginx on Ubuntu with the least connection algorithm
- Implemented DB replica set to handle 4500 request per second within 0.1 % of error rate


### Usage

```
git clone https://github.com/matthewmata/nav-about.git
cd nav-about
npm install
npm start
```

### Requirements

You need to install Nodejs.

### Development Tools

* [react.js](https://www.npmjs.com/package/react) - The official React.js website
* [express.js](https://www.npmjs.com/package/express) - The official Express.js website
* [webpack 4](https://www.npmjs.com/package/webpack) - The official Webpack website
