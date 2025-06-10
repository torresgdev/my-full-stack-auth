

# ============================================================================
# ESTÁGIO DE BUILD (Multi-stage build)
# ============================================================================

FROM node:20-alpine AS build


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ============================================================================
# ESTÁGIO DE PRODUÇÃO (Servindo com Nginx)
# ============================================================================

FROM nginx:alpine AS production


RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]