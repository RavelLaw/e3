export default function pathFromCommands(context, commands) {
  commands.forEach((command, i) => {
    let method;

    if (i === 0) {
      method = context.moveTo;
    } else if (command.length === 2) {
      method = context.lineTo;
    } else if (command.length === 4) {
      method = context.quadraticCurveTo;
    } else if (command.length === 6) {
      method = context.bezierCurveTo;
    }

    method.apply(context, command);
  });
}
