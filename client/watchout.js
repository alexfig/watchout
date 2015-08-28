var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};

var axes ={
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
};

var gameBoard = d3.select('.container').append('svg:svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height);

var updateBestScore = function(){
  gameStats.bestScore =
    d3.max([gameStats.bestScore, gameStats.score]);

  d3.select('#best-score').text(gameStats.bestScore.toString());
};

var players = [];
players.push( new Player(gameOptions) );
players[0].render(gameBoard);
//players.push( new Player(gameOptions).render(gameBoard) );

var createEnemies = function(){
  return d3.range(0,gameOptions.nEnemies).map(function(i){
    var enemy = {};
    enemy.id = i;
    enemy.x = Math.random()*100;
    enemy.y = Math.random()*100;
    return enemy;
  });
};


var render = function(enemy_data){
  var enemies = gameBoard.selectAll('circle.enemy')
            .data(enemy_data, function(d){
              return d.id;
            });

  enemies.enter()
     .append('svg:circle')
       .attr('class', 'enemy')
       .attr('cx', function(enemy) { return axes.x(enemy.x); })
       .attr('cy', function(enemy) { return axes.y(enemy.y); })
       .attr('r',10);

  enemies.each(function(enemy){
    enemy.x = Math.random()*100;
    enemy.y = Math.random()*100;
  });


  enemies.transition()
       .attr('class', 'enemy')
       .attr('cx', function(enemy) { return axes.x(enemy.x); })
       .attr('cy', function(enemy) { return axes.y(enemy.y); })
       .attr('r',10);

  enemies.exit()
    .remove();
};

var enemies = createEnemies();

render(enemies);