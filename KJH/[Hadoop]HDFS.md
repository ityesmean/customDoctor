# MapReduce 예제

## hdfs 서버에 데이터 넣을 폴더(input) 만들기 / 확인
$ hdfs dfs -mkdir /user/{username}/input
$ hdfs dfs -ls /user/{username}/

## 데이터가 있는 위치로 이동 / hdfs서버에 있는 input폴더에 붙여넣기 / 확인
$ cd $HADOOP_HOME/etc/hadoop/
$ hdfs dfs -put hadoop-env.sh /user/{username}/input
$ hdfs dfs -ls /user/hadoop/input

## 데이터에 적용할 jar파일 / jar파일 내 기능 / 데이터경로 / 출력 파일 저장 경로
$ hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.3.4.jar 
wordcount input output

## 출력파일 확인 / 실행
$ hdfs dfs -ls /user/hadoop/output
$ hdfs dfs -cat /user/hadoop/output/part-r-00000

## 하둡 프로그램(하둡세상)에 있는 HDFS파일인 part-r-00000을 운영체제의 하둡 홈에 w.txt명으로 복제시킨다.
hadoop fs -get output1/part-r-00000 $HADOOP_HOME/w.txt

## 운영체제에 저장된 w.txt파일을 실행시킨다.
gedit $HADOOP_HOME/w.txt