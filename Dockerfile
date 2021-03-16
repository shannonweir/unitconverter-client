FROM node:12-alpine AS builder
COPY . ./unitconverter-client
WORKDIR /unitconverter-client
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /unitconverter-client/dist/unitconverter-client/ /usr/share/nginx/html