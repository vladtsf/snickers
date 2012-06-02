#!/bin/sh

case "$1" in
	"start")
		NODE_ENV=production forever start app.js
	;;
	"stop")
		NODE_ENV=production forever stop app.js
	;;
	"restart")
		NODE_ENV=production forever restart app.js
	;;
	"init")
		./init-db.js
	;;
	*)
	echo "Unknown command $1!"
	;;
esac