import { Gavel, Landmark, type LucideIcon, Megaphone, Microscope, Flag, ConciergeBell } from "lucide-react";
import type { ImageName } from "./images";

export type MemberKey = "uyenPhuong" | "khoaLe" | "hoangLam" | "boiNgoc" | "anhThuOps" | "anhThuBrand";

/** Names are proper nouns and are not translated; roles and descriptions live in messages/<locale>/about.json. */
export const teamMembers: { key: MemberKey; name: string; image: ImageName; icon: LucideIcon }[] = [
  { key: "uyenPhuong", name: "Uyên Phương", image: "member-uyen-phuong", icon: Flag },
  { key: "khoaLe", name: "Khoa Lê", image: "member-khoa-le", icon: Microscope },
  { key: "hoangLam", name: "Hoàng Lâm", image: "member-hoang-lam", icon: Gavel },
  { key: "boiNgoc", name: "Bội Ngọc", image: "member-boi-ngoc", icon: Landmark },
  { key: "anhThuOps", name: "Anh Thư", image: "member-anh-thu-ops", icon: ConciergeBell },
  { key: "anhThuBrand", name: "Anh Thư", image: "member-anh-thu-brand", icon: Megaphone },
];
