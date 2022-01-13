FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Install OpenSSH and set the password for root to "Docker!". In this example, "apk add" is the install instruction for an Alpine Linux-based image.
RUN apk add openssh \
    && echo "root:Docker!" | chpasswd

# Copy the sshd_config file to the /etc/ssh/ directory
COPY sshd_config /etc/ssh/

# Copy and configure the init file
COPY init.sh /usr/local/bin/
RUN chmod u+x /usr/local/bin/init.sh

# Copy and configure the ssh_setup file
RUN mkdir -p /tmp
COPY ssh_setup.sh /tmp
RUN chmod +x /tmp/ssh_setup.sh \
    && (sleep 1;/tmp/ssh_setup.sh 2>&1 > /dev/null)

EXPOSE 80 2222

# CMD ["npm", "start"]
ENTRYPOINT [ "/usr/local/bin/init.sh" ]