# Stage 1: Build stage
FROM oven/bun:alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install

# Copy project files and bundle the application
COPY . . 
RUN bun run bundle

# Stage 2: Final minimal container
FROM oven/bun:distroless AS final

WORKDIR /usr/src/app

# Copy only the bundled application and dependencies
COPY --from=builder /usr/src/app/dist/server.js ./dist/server.js

# Use non-root user for security
USER 1000

# Expose the application port
EXPOSE 3000/tcp

# Run the bundled application
ENTRYPOINT ["bun"]
CMD ["dist/server.js"]