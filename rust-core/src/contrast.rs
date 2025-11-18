pub fn contrast(data: &mut [u8], value: f32) {
    let factor = value / 100.0;

    for i in (0..data.len()).step_by(4) {
        let r = data[i] as f32;
        let g = data[i + 1] as f32;
        let b = data[i + 2] as f32;

        let nr = ((r - 128.0) * factor + 128.0).clamp(0.0, 255.0);
        let ng = ((g - 128.0) * factor + 128.0).clamp(0.0, 255.0);
        let nb = ((b - 128.0) * factor + 128.0).clamp(0.0, 255.0);

        data[i] = nr as u8;
        data[i + 1] = ng as u8;
        data[i + 2] = nb as u8;
    }
}
