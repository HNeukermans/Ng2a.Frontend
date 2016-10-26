export function logToConsole(name: string) {
    return function (...params) {
        params.forEach(function (param) {
            if (param instanceof Event) {
                console.log(name + ': ' + param);
            }
            else {
                try {
                    console.log(name + ': ' + JSON.stringify(param));
                } catch (error) {
                    console.log(name + ': could not log to console. error: ' + error);
                }
            }
        });
    };
}

export function handleError(error: any) {
    alert(error);
}
