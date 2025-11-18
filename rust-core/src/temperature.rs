pub fn temperature(data: &mut [u8], temp: f32) {
    let factor = temp;

    for i in (0..data.len()).step_by(4) {
        let r = data[i] as f32;
        let g = data[i + 1] as f32;
        let b = data[i + 2] as f32;

        let nr = (r + factor).clamp(0.0, 255.0);
        let ng = (g - factor).clamp(0.0, 255.0);
        let nb = b;

        data[i] = nr as u8;
        data[i + 1] = ng as u8;
        data[i + 2] = nb as u8;
    }
}
