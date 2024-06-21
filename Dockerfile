FROM node:20

WORKDIR /app

# copy package json
COPY package* .
COPY ./prisma .

RUN npm install
RUN npx prisma generate

# copy all the files form the main dir onto to the user dir
COPY . .
# all these commands run when we are building the image

RUN npm run build

EXPOSE 3000


# runs when you actually start the image
CMD ["node","dist/index.js"]