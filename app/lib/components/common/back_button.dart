import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../Utilities/theme/color_data.dart';
import '../../Utilities/theme/size_data.dart';
import 'icon.dart';

class CustomBackButton extends ConsumerWidget {
  final Function? method;
  const CustomBackButton({super.key, this.method});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    CustomSizeData sizeData = CustomSizeData.from(context);
    CustomColorData colorData = CustomColorData.from(ref);

    double aspectRatio = sizeData.aspectRatio;

    return GestureDetector(
      onTap: () {
        Navigator.pop(context);
        method != null ? method!(ref) : null;
      },
      child: Container(
        padding: EdgeInsets.all(aspectRatio * 10),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(aspectRatio * 14),
          color: colorData.primaryColor(1),
        ),
        child: CustomIcon(
          icon: Icons.arrow_back_ios_new_rounded,
          color: colorData.primaryColor(.85),
          size: aspectRatio * 42,
        ),
      ),
    );
  }
}