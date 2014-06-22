# Unlimited Undo: Space as a Value

Application programming interfaces (APIs) allow software developers to access external resources for their own applications. This project presents the kernel of a 'physical API' to allow other artists & visitors to change the state of the Kaka‘ako Agora.

## Kaka‘ako Agora

*Kaka‘ako Agora* [(on Kickstarter)](https://www.kickstarter.com/projects/1872441385/kakaako-agora-an-indoor-public-park-by-atelier-bow) is a park designed for 21st Century Honolulu. It is the first project of it's kind in Honolulu: A beautiful indoor pavilion that calls on world class architecture to create a dynamic space for our local community.

### The Reusable Framework

This project provides an API for saving and replaying data stored by artists, which represents activity within the Agora. Using this framework allows artists to concentrate on the input and output respresentation of this data, rather than the sometimes complicated work or data input, storage and output.

The framework makes use of the following technologies:
* [Datomic](http://www.datomic.com/)
* [ClojureScript](https://github.com/clojure/clojurescript) - [Om](https://github.com/swannodette/om)
* [React](http://facebook.github.io/react/)

Giving it the following novel properties:
* [Time travel-like](http://swannodette.github.io/2013/12/31/time-travel/) undo capabilities
* Effortless query and playback of historical data


## Setup

```` bash
# Start web server:
lein run

# Start with reload behavior:
lein run -dev

# Start on port other than 3000:
lein run 4000

# Both -dev and port can be combined.
````

````bash
# Start web server (from REPL):
# go to the src/clj/agora/repl.clj ns and run:
(start-server)
;; re-eval src/clj files to see changes

# Stop server:
(stop-server)
````

````bash
# Build CLJS (auto-detect src/cljs changes):
lein cljsbuild auto
````

````bash
# Package and run (untested):
lein ring uberjar
java -jar target/agora-0.1.0-SNAPSHOT-standalone.jar
````

## Datomic

#### Quickstart
Use Datomic Free and start a server on localhost:4334.

#### Step by Step
* Download Datomic Free from Datomic.com
* Unzip the package wherever you want
* `cd` into the directory you just unzipped
* Run `./bin/transactor config/samples/free-transactor-template.properties`
* You should see a message saying that Datomic is listening on port 4334