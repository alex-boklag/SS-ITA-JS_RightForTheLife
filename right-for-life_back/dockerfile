FROM node

RUN apt-get update

RUN git --version
RUN node --version
RUN npm --version

###worked solution###
#RUN cd /tmp \
#    && git clone -b backend-v1-wip https://0df504886599bca4bdee37f57c281a3b1d089332:x-oauth-basic@github.com/PsyhoBelka/SS-ITA-JS_RightForTheLife.git ./ \
#    && mkdir /app \
#    && cp -p -R * /app \
#    && chown -R node:node /app \
#    && chmod 777 -R /app \
#    && cd /app/right-for-life_back \
#    && npm i \
#    && ls -l
#####################

#another solution
WORKDIR /tmp
RUN git clone -b backend-v1-wip https://0df504886599bca4bdee37f57c281a3b1d089332:x-oauth-basic@github.com/PsyhoBelka/SS-ITA-JS_RightForTheLife.git ./
RUN mkdir /app
RUN cp -p -R * /app
RUN chown -R node:node /app
RUN chmod 777 -R /app

WORKDIR /app/right-for-life_back
RUN npm i
RUN ls -l

EXPOSE 4000

CMD cd /app/right-for-life_back && npm start