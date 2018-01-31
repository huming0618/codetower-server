### Dockerize

###### Build
`docker build -t peter/codetower .`

###### Run
`docker run -p 9000:9000 -d peter/codetower`
`docker run --name codetower -p 9000:9000 -d peter/codetower`

##### Check Logs
`docker logs codetower`