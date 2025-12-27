# Makefile for TV Maze App

.PHONY: help install dev build test lint docker-build docker-run docker-stop clean

# Variables
IMAGE_NAME = tv-maze-app
CONTAINER_NAME = tv-maze-app-container
PORT = 8080

help: ## Show this help message
	@echo "TV Maze App - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

dev: ## Start development server
	npm run dev

build: ## Build for production
	npm run build

test: ## Run tests
	npm run test

test-ui: ## Run tests with UI
	npm run test:ui

test-coverage: ## Run tests with coverage
	npm run test:coverage

lint: ## Run linter
	npm run lint

preview: ## Preview production build locally
	npm run preview

docker-build: ## Build Docker image
	docker build -t $(IMAGE_NAME) .

docker-run: ## Run Docker container
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):80 $(IMAGE_NAME)
	@echo "Application running at http://localhost:$(PORT)"

docker-stop: ## Stop and remove Docker container
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

docker-logs: ## View Docker container logs
	docker logs -f $(CONTAINER_NAME)

docker-shell: ## Open shell in Docker container
	docker exec -it $(CONTAINER_NAME) sh

clean: ## Clean build artifacts and dependencies
	rm -rf dist node_modules coverage

all: install lint test build ## Install, lint, test, and build
