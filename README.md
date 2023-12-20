# getmyip
JavaScript/Express that prints the IP of the node/server/pod where it runs. Uses express, pug, ip modules.
I use the app on EKS/AKS or any other Kubernetes cluster to print the pod IP.

```
npm install
node server.js
```

Runs on port 3000, change line #18 in server.js for a different port.
Test with a browser http://<ip_address>:3000

To create a docker image use the provided Dockerfile.
```
docker build -t <name>/getmyip:1.0.0 .
docker run -p 3000:3000 -d <name>/getmyip:1.0.0
```

