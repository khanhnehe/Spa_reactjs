import EventEmitter from 'events';
//'events' này phía thằng nodejs nó hỗ trợ cho mk r ko phải cài đặt j 

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0); //unlimit listener tức ta sẽ ko giới hạn số ng nghe

export const emitter = _emitter;