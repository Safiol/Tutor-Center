FROM node:lts

WORKDIR /opt/app

COPY package.json .
RUN yarn add expo
RUN npx expo install
RUN npm install --save-dev jest @testing-library/react-native jest-expo react-test-renderer
#RUN npm install expo-cli

COPY . . 

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002


CMD ["npx", "expo", "start", "-w", "--host", "localhost"]
