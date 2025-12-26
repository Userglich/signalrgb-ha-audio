let lastSend = 0;
const INTERVAL = 250; // ms (4x pro Sekunde)

const HA_URL = "http://192.168.178.50:8123/api/states/input_number.pc_audio_volume";
const HA_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMWI0ZmFmZjRjY2E0YmE4YWJmN2M3ZWUwMjA0NDYzNSIsImlhdCI6MTc2Njc3OTE0MywiZXhwIjoyMDgyMTM5MTQzfQ.v1mgnzYZCbgGyXv7SXZJtQ9qGhAULVEGBYRp6ehbaoM";

export function update() {
  console.log("update() called"); // <- Debug
    const now = Date.now();
    if (now - lastSend < INTERVAL) return;
    lastSend = now;

    const audio = Engine.Audio;

    // Sicherstellen, dass audio vorhanden ist
    if (!audio) return;

    const payload = {
        state: Math.round(audio.volume * 100)
    };

    fetch(HA_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${HA_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res => console.log("HA Response:", res.status))
    .catch(err => console.error("HA Fetch Error:", err));
}

