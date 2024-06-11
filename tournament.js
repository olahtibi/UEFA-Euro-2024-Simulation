var Tournament = function () {
    this.groups = [];

    var entriesA = [];
    entriesA.push(new GroupEntry(teams.ger, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesA.push(new GroupEntry(teams.sco, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesA.push(new GroupEntry(teams.hun, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesA.push(new GroupEntry(teams.swi, 0, 0, 0, 0, 0, 0, 0, 0 ));
    this.groups.push(new Group(
        "A",
        entriesA
    ));

    var entriesB = [];
    entriesB.push(new GroupEntry(teams.spa, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesB.push(new GroupEntry(teams.cro, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesB.push(new GroupEntry(teams.ita, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesB.push(new GroupEntry(teams.alb, 0, 0, 0, 0, 0, 0, 0, 0 ));
    this.groups.push(new Group(
        "B",
        entriesB
    ));

    var entriesC = [];
    entriesC.push(new GroupEntry(teams.slv, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesC.push(new GroupEntry(teams.den, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesC.push(new GroupEntry(teams.srb, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesC.push(new GroupEntry(teams.eng, 0, 0, 0, 0, 0, 0, 0, 0 ));
    this.groups.push(new Group(
        "C",
        entriesC
    ));

    var entriesD = [];
    entriesD.push(new GroupEntry(teams.pol, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesD.push(new GroupEntry(teams.ned, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesD.push(new GroupEntry(teams.aut, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesD.push(new GroupEntry(teams.fra, 0, 0, 0, 0, 0, 0, 0, 0 ));
    this.groups.push(new Group(
        "D",
        entriesD
    ));

    var entriesE = [];
    entriesE.push(new GroupEntry(teams.bel, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesE.push(new GroupEntry(teams.slk, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesE.push(new GroupEntry(teams.rom, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesE.push(new GroupEntry(teams.ukr, 0, 0, 0, 0, 0, 0, 0, 0 ));
    this.groups.push(new Group(
        "E",
        entriesE
    ));

    var entriesF = [];
    entriesF.push(new GroupEntry(teams.tur, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesF.push(new GroupEntry(teams.geo, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesF.push(new GroupEntry(teams.por, 0, 0, 0, 0, 0, 0, 0, 0 ));
    entriesF.push(new GroupEntry(teams.czr, 0, 0, 0, 0, 0, 0, 0, 0 ));
    this.groups.push(new Group(
        "F",
        entriesF
    ));

};

Tournament.prototype.threes = function() {
    var result = []
    var threesE = [];
    for(var i = 0; i < this.groups.length; i++) {
        threesE.push(this.groups[i].entries[2]);
    }
    var threesG = new Group("3rds", threesE);
    threesG.sort();
    // console.log(threesG.entries);
    result.push(threesG.entries[0].team);
    result.push(threesG.entries[1].team);
    result.push(threesG.entries[2].team);
    result.push(threesG.entries[3].team);
    // console.log(result);
    return result;
}

Tournament.prototype.simulate = function() {
    for(var i = 0; i < this.groups.length; i++) {
        this.groups[i].simulate();
        this.groups[i].sort();
    }
    var threes = this.threes()
    var data = [];
    data[0] = this.groups[1].entries[0].team;  // Winner Group B
    data[1] = threes[0];  // 3rd Group A/D/E/F
    data[2] = this.groups[0].entries[0].team;  // Winner Group A
    data[3] = this.groups[2].entries[1].team;  // Runner-up Group C
    data[4] = this.groups[5].entries[0].team;  // Winner Group F
    data[5] = threes[1];  // 3rd Group A/B/C
    data[6] = this.groups[3].entries[1].team;  // Runner-up Group D
    data[7] = this.groups[4].entries[1].team;  // Runner-up Group E
    data[8] = this.groups[4].entries[0].team;  // Winner Group E
    data[9] = threes[2];  // 3rd Group A/B/C/D
    data[10] = this.groups[3].entries[0].team; // Winner Group D
    data[11] = this.groups[5].entries[1].team; // Runner-up Group F
    data[12] = this.groups[2].entries[0].team; // Winner Group C
    data[13] = threes[3]; // 3rd Group D/E/F
    data[14] = this.groups[0].entries[1].team; // Runner-up Group A
    data[15] = this.groups[1].entries[1].team; // Runner-up Group B
    this.knockout = new Knockout(data);
    this.knockout.simulate();
}

Tournament.prototype.render = function() {
    var str = '<table>';
    for(var i = 0; i < this.groups.length; i++) {
        var g = this.groups[i];
        str += '<tr><td colspan="9">Group ' + g.label + '</td></tr>';
        str += '<tr><td>Pos</td><td>Team</td><td>Pld</td><td>W</td><td>D</td><td>L</td><td>GF</td><td>GA</td><td>Pts</td></tr>'
        for(var j = 0; j < g.entries.length; j++) {
            var e = g.entries[j];
            str += '<tr><td>' + (j+1) + '</td><td>' + e.team.name + '</td><td>' + e.pld + '</td><td>' + e.win + '</td><td>' + e.draw +'</td><td>' + e.loose + '</td><td>' + e.gf + '</td><td>' + e.ga + '</td><td>' + e.pts + '</td></tr>'
        }
        for(var j = 0; j < g.results.length; j++) {
            str += '<tr><td colspan="9">' + g.results[j] + '</td></tr>';
        }
    }
    str += '<table>';
    for(var j = 0; j < this.knockout.results.length; j++) {
        str += '<br/><label>' + this.knockout.results[j] + '</label>';
    }

    document.getElementById('details').innerHTML = str;
    document.getElementById("champLabel").textContent = this.knockout.champion().name;
}
