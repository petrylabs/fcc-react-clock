export function formatTime(time, format) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return format == 'mm:ss'
    ? `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    : minutes;
}