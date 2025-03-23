# Funny Strapi App - Dad Joke API

## Project Overview

The **Funny Strapi App** is a full-stack application that generates dad jokes using Strapi as the backend and Next.js as the frontend. The backend integrates with the **Google Gemini API** to generate jokes dynamically. The application uses **PostgreSQL** as the database and supports **meme generation** and **random thoughts generation**.

## Folder Structure

### 1. Backend: `dad-joke (Strapi)`

This folder contains the backend of the project, which is built using **Strapi**.

- **Dockerfile**: Used to build the backend image.
- **docker-compose.yml**: Used to spin up the PostgreSQL database for development.

#### How to Run the Backend

1. Run `docker-compose up` to start the PostgreSQL database.
2. Copy the `.env.example` file to `.env` and update the values.
3. Install dependencies using:
   ```sh
   yarn install
   ```
4. Start the Strapi backend with:
   ```sh
   yarn develop --debug
   ```

### 2. Frontend: `dad-joke-frontend`

This folder contains the frontend of the project, built with **Next.js**.

- The frontend consumes the Dad Joke API from the backend.
- When a request is made, the backend calls the **Google Gemini API**, generates a joke, saves it to the database, and returns the joke.
- Features:
  - **Meme Generator**: Generates memes using input text and an image.
  - **Random Thoughts**: Generates random thoughts.
- **Dockerfile**: Used to build the frontend image.

#### How to Run the Frontend

1. Install dependencies using:
   ```sh
   yarn install
   ```
2. Update the **API Base URL** in `src/hooks/axiosInstance.js`:
   ```js
   const API_BASE_URL = "http://localhost:1337";
   ```
3. Start the frontend application with:
   ```sh
   yarn dev
   ```

---

## Running the Project with Kubernetes

The project is deployed using **MicroK8s**. Ensure MicroK8s is installed on your local machine.

### 1. Setup MicroK8s

```sh
microk8s start
microk8s enable dns
microk8s enable ingress
```

### 2. Kubernetes Folder Structure

Navigate to the `k8s/` directory where you will find:

- `amaka-namespace.yml` - Creates the Kubernetes namespace.
- `frontend-deployment.yml` - Deploys the frontend.
- `strapi-deployment.yml` - Deploys the backend.
- `strapi-hpa.yml` - Sets up the horizontal pod autoscaler for Strapi.
- `amaka-chart/` - Contains the **Helm chart** for the project.
- `grafana/` - YAML configuration for Grafana.
- `prometheus/` - YAML configuration for Prometheus.
- `postgres-deployment.yml` - Deploys the PostgreSQL database.

### 3. Deploy the Services

Run the YAML files in the following order:

```sh
kubectl apply -f amaka-namespace.yml
kubectl apply -f postgres-deployment.yml
```

Wait for PostgreSQL to be running:

```sh
kubectl get pods -n amaka
```

Then deploy Strapi:

```sh
kubectl apply -f strapi-deployment.yml
```

- The **Ingress Controller** exposes the Strapi service.
- Add the following entry to `/etc/hosts`:
  ```
  127.0.0.1 strapi.local
  ```
- Since Mac does not open ports **80** and **443** by default, forward port **80** to **8080**:
  ```sh
  microk8s kubectl port-forward -n ingress daemonset/nginx-ingress-microk8s-controller 8080:80
  ```
- Access Strapi at: [http://strapi.local:8080](http://strapi.local:8080)

Deploy the frontend:

```sh
kubectl apply -f frontend-deployment.yml
```

Wait for the backend to be up before running the frontend.

Deploy the Horizontal Pod Autoscaler:

```sh
kubectl apply -f strapi-hpa.yml
```

Deploy Prometheus:

```sh
cd prometheus
kubectl apply -f prometheus-deployment.yml
```

- Access Prometheus at: `http://<NODE_IP>:30091`
- Find the **Node IP**:
  ```sh
  kubectl get nodes -o wide
  ```

Deploy Grafana:

```sh
cd grafana
kubectl apply -f grafana-deployment.yml
```

- Access Grafana at: `http://<NODE_IP>:32001`

---

## Observations on Horizontal Pod Autoscaler

- **Configuration**:
  - Min Pods: **1**
  - Max Pods: **10**
  - CPU Target: **20%** (for demo)
  - Memory Target: **50%** (for demo)

### Load Testing HPA

To generate traffic for autoscaling:

1. Using Apache Benchmark:
   ```sh
   ab -n 1000 -c 200 http://strapi.local:8080/admin/auth/login
   ```
2. Using Continuous `curl` Requests:
   ```sh
   while true; do curl -s http://strapi.local:8080/ > /dev/null; done
   ```

This successfully triggered autoscaling, increasing the pods to **10**.

### Monitoring with K9s

Monitor pods and autoscaler using:

```sh
k9s -n amaka
```

---

## Helm Chart Deployment

The **Helm Chart** is located in the `amaka-chart/` folder and contains:

- `Chart.yml` - Helm metadata.
- `values.yml` - Default values.
- `templates/` - Kubernetes manifests, including:
  - `frontend-deployment.yml`
  - `strapi-deployment.yml`
  - `strapi-hpa.yml`

To deploy with Helm:

```sh
helm install amaka amaka-chart/
```

---

## TODOs

- ✅ Add video of **Horizontal Pod Autoscaler** in action.
- ✅ Configure **Prometheus** to scrape Strapi metrics.
- ✅ Integrate **Grafana dashboards** for better monitoring.

---
