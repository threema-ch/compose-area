/// Convert a value to u32 using the `TryFrom` trait.
/// Panic if conversion fails.
macro_rules! make_u32 {
    ($val:expr) => {{
        use std::convert::TryFrom;
        u32::try_from($val).expect("Value does not fit in u32")
    }}
}
