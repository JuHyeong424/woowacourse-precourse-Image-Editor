pub fn exposure(data: &mut [u8], value: f32) {
    let factor = 2_f32.powf(value / 100.0);

    for i in (0..data.len()).step_by(4) {
        let r = (data[i] as f32) * factor;
        let g = (data[i + 1] as f32) * factor;
        let b = (data[i + 2] as f32) * factor;

        data[i] = r.min(255.0).max(0.0) as u8;
        data[i + 1] = g.min(255.0).max(0.0) as u8;
        data[i + 2] = b.min(255.0).max(0.0) as u8;
    }
}
