pub fn temperature(data: &mut [u8], temp: f32) {
    let t = (temp / 100.0).clamp(-1.0, 1.0);

    for i in (0..data.len()).step_by(4) {
        let r = data[i] as f32;
        let g = data[i + 1] as f32;
        let b = data[i + 2] as f32;

        let nr = r + 40.0 * t;
        let nb = b - 40.0 * t;

        data[i] = nr.clamp(0.0, 255.0) as u8;
        data[i + 1] = g as u8;
        data[i + 2] = nb.clamp(0.0, 255.0) as u8;
    }
}
