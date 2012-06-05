DIR=`dirname $0`;
BUILD=`which jade-bundler`;

cd "$DIR/jade/";
$BUILD --object "SnickersTemplates" -u `find * | grep ".jade$" | grep -v ".inc.jade$"`;