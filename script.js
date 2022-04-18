const nothing = new AudioContext();

const me = nothing.createGain();
me.gain.value = 3.5;
me.connect(nothing.destination);

const prolongsleep = (ms) => new Promise(res => setTimeout(res, ms));

!async function() {
    let pendulum = false;
    while(true) {
        await prolongsleep(300);
        if (me.gain.value >= 5 || me.gain.value < 3.5) (pendulum = !pendulum, await prolongsleep(2000));
        if (pendulum) me.gain.value-=0.05;
        else me.gain.value+=0.05;
    }
}();

let dream = nothing.createBufferSource();
fetch('./empty.mp3') 
.then(resp => resp.arrayBuffer())
.then(noise => nothing.decodeAudioData(noise))
.then(emptiness => {
    dream.buffer = emptiness;
    dream.loop = true;
    dream.connect(me);
    dream.start(0);
});