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

Deploy in AWS behind a load balancer.
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
spec:
  replicas: 10
  selector:
    matchLabels:
      run: demo
  template:
    metadata:
      labels:
        run: demo
    spec:
      containers:
      - name: demo
        image: klimenta/getmyip
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: loadbalancer
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
    service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: ip
    service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
spec:
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
  type: LoadBalancer
  selector:
    run: demo
```

To use on bare-metal Kubernetes with MetalLB load balancer.
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
spec:
  replicas: 6
  selector:
    matchLabels:
      run: demo
  template:
    metadata:
      labels:
        run: demo
    spec:
      containers:
      - name: demo
        image: klimenta/getmyip
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: loadbalancer
spec:
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
  type: LoadBalancer
  selector:
    run: demo
```
