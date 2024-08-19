var functions = {};
        function execute() {
            var code = document.getElementById("input").value;
            var output = document.getElementById("output");
            output.value = "";

            var lines = code.split('\n');
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim();
                if (line.startsWith('fu')) {
                    var functionName = line.split(' ')[1].replace(':', '');
                    var functionCode = '';
                    i++;
                    while (i < lines.length && !lines[i].trim().startsWith('cf')) {
                        functionCode += lines[i].trim() + '\n';
                        i++;
                    }
                    functions[functionName] = functionCode;
                } else if (line.endsWith(';')) {
                    var functionName = line.slice(0, -1);
                    if (functions[functionName]) {
                        executeFunction(functions[functionName]);
                    } else {
                        executeLine(line);
                    }
                } else {
                    executeLine(line);
                }
            }
        }

        function executeFunction(functionCode) {
            var lines = functionCode.split('\n');
            for (var i = 0; i < lines.length; i++) {
                executeLine(lines[i].trim());
            }
        }

        function executeLine(line) {
            var tokens = line.split(' ');
            var output = document.getElementById("output");
            if (tokens[0] === 'pt') {
                output.value += tokens.slice(1).join(' ').replace(/"/g, '') + '\n';
            } else if (tokens[0] === 'wm') {
                var milliseconds = parseFloat(tokens[1]);
                sleep(milliseconds);
            } else if (tokens[0] === 'ex') {
                return;
            } else if (tokens[0] === 'it') {
                output.value += "True\n";
            } else if (tokens[0] === 'nt') {
                output.value += "False\n";
            }
        }

        function sleep(milliseconds) {
            var start = new Date().getTime();
            while (true) {
                if ((new Date().getTime() - start) > milliseconds){
                    break;
                }
            }
        }
}
