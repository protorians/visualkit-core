

export function trimSpace(data: string){
  return data.replace(/ /g, '')
}

export function randomName(length: number = 10){
  const provider = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out: string[] = [];

  for (let index = 0; index < length; index++) {
    out.push( provider.charAt(Math.floor(Math.random() * provider.length)) )
  }

  return out.join('');
}


export function logTime(date?: Date){
  return (date || (new Date())).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}

export function logDateTime(date?: Date){
  return (date || (new Date())).toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}