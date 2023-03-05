FROM denoland/deno:centos-1.31.1

WORKDIR /app

COPY . .

CMD ["run", "--allow-read", "--allow-env", "--allow-net", "--watch", "src/main.ts"]
