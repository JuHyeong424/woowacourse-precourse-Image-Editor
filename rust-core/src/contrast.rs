#[no_mangle]
pub extern "C" fn contrast(ptr: *mut u8, length: usize, contrast_value: f32) {
    let pixels = unsafe { core::slice::from_raw_parts_mut(ptr, length) };
    let factor = contrast_value / 100.0;

    for i in (0..length).step_by(4) {
        let r = pixels[i] as f32;
        let g = pixels[i + 1] as f32;
        let b = pixels[i + 2] as f32;

        let nr = ((r - 128.0) * factor + 128.0).clamp(0.0, 255.0);
        let ng = ((g - 128.0) * factor + 128.0).clamp(0.0, 255.0);
        let nb = ((b - 128.0) * factor + 128.0).clamp(0.0, 255.0);

        pixels[i]     = nr as u8;
        pixels[i + 1] = ng as u8;
        pixels[i + 2] = nb as u8;
    }
}
