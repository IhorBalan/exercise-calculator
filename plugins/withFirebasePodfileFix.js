const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

/**
 * Expo config plugin to fix React Native Firebase non-modular header issues
 * when using static frameworks. This modifies the Podfile's post_install hook
 * to add CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES = YES
 */
const withFirebasePodfileFix = config => {
  return withDangerousMod(config, [
    'ios',
    config => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');

      if (!fs.existsSync(podfilePath)) {
        return config;
      }

      let podfileContents = fs.readFileSync(podfilePath, 'utf-8');

      // Check if the fix is already applied
      if (podfileContents.includes('CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES')) {
        return config;
      }

      // Find the post_install hook and add our fix after react_native_post_install
      // We'll look for the pattern: react_native_post_install(...) followed by closing paren and then end
      const reactNativePostInstallPattern =
        /(react_native_post_install\([\s\S]*?\)[\s\S]*?)(\n\s+end)/;

      if (reactNativePostInstallPattern.test(podfileContents)) {
        // Insert our fix after react_native_post_install but before the post_install's end
        podfileContents = podfileContents.replace(
          reactNativePostInstallPattern,
          `$1
    # Fix for React Native Firebase with static frameworks
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
        # Ensure React Native headers are accessible for React Native Firebase modules
        if target.name.start_with?('RNFB')
          # Add React-Core framework dependency
          react_core_target = installer.pods_project.targets.find { |t| t.name == 'React-Core' }
          if react_core_target
            target.add_dependency(react_core_target)
          end
          # Disable modules for React Native Firebase to use header imports instead
          config.build_settings['DEFINES_MODULE'] = 'NO'
          # Add framework and header search paths
          config.build_settings['FRAMEWORK_SEARCH_PATHS'] ||= ['$(inherited)']
          config.build_settings['FRAMEWORK_SEARCH_PATHS'] << '"\${PODS_CONFIGURATION_BUILD_DIR}/React-Core"'
          config.build_settings['HEADER_SEARCH_PATHS'] ||= ['$(inherited)']
          config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_CONFIGURATION_BUILD_DIR}/React-Core/React-Core.framework/Headers"'
          config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_ROOT}/Headers/Public/React-Core"'
          config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_ROOT}/Headers/Public/React"'
          config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_ROOT}/Headers/Public/React-Core/React"'
          # Ensure React-Core is linked
          config.build_settings['OTHER_LDFLAGS'] ||= ['$(inherited)']
          config.build_settings['OTHER_LDFLAGS'] << '-framework React-Core'
        end
      end
    end
$2`
        );
      } else if (podfileContents.includes('post_install do |installer|')) {
        // Fallback: find post_install and add before its closing end
        const postInstallEndPattern = /(post_install do \|installer\|[\s\S]*?)(\n\s+end\s*$)/m;
        if (postInstallEndPattern.test(podfileContents)) {
          podfileContents = podfileContents.replace(
            postInstallEndPattern,
            `$1
    # Fix for React Native Firebase with static frameworks
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
        # Ensure React Native headers are accessible for React Native Firebase modules
        if target.name.start_with?('RNFB')
          # Add React-Core framework dependency
          react_core_target = installer.pods_project.targets.find { |t| t.name == 'React-Core' }
          if react_core_target
            target.add_dependency(react_core_target)
          end
          # Disable modules for React Native Firebase to use header imports instead
          config.build_settings['DEFINES_MODULE'] = 'NO'
          # Add framework and header search paths
          config.build_settings['FRAMEWORK_SEARCH_PATHS'] ||= ['$(inherited)']
          config.build_settings['FRAMEWORK_SEARCH_PATHS'] << '"\${PODS_CONFIGURATION_BUILD_DIR}/React-Core"'
          config.build_settings['HEADER_SEARCH_PATHS'] ||= ['$(inherited)']
          config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_CONFIGURATION_BUILD_DIR}/React-Core/React-Core.framework/Headers"'
          config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_ROOT}/Headers/Public/React-Core"'
          config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_ROOT}/Headers/Public/React"'
          config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_ROOT}/Headers/Public/React-Core/React"'
          # Ensure React-Core is linked
          config.build_settings['OTHER_LDFLAGS'] ||= ['$(inherited)']
          config.build_settings['OTHER_LDFLAGS'] << '-framework React-Core'
        end
      end
    end
$2`
          );
        }
      } else {
        // If post_install doesn't exist, add it before the target's closing end
        podfileContents = podfileContents.replace(
          /(\n\s+end\s*$)/,
          `
  post_install do |installer|
    # Fix for React Native Firebase with static frameworks
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
        # Ensure React Native headers are accessible for React Native Firebase modules
        if target.name.start_with?('RNFB')
          # Add React-Core framework dependency
          react_core_target = installer.pods_project.targets.find { |t| t.name == 'React-Core' }
          if react_core_target
            target.add_dependency(react_core_target)
          end
          # Disable modules for React Native Firebase to use header imports instead
          config.build_settings['DEFINES_MODULE'] = 'NO'
          # Add framework and header search paths
          config.build_settings['FRAMEWORK_SEARCH_PATHS'] ||= ['$(inherited)']
          config.build_settings['FRAMEWORK_SEARCH_PATHS'] << '"\${PODS_CONFIGURATION_BUILD_DIR}/React-Core"'
          config.build_settings['HEADER_SEARCH_PATHS'] ||= ['$(inherited)']
          config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_CONFIGURATION_BUILD_DIR}/React-Core/React-Core.framework/Headers"'
          config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_ROOT}/Headers/Public/React-Core"'
          config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_ROOT}/Headers/Public/React"'
          config.build_settings['HEADER_SEARCH_PATHS'] << '"\${PODS_ROOT}/Headers/Public/React-Core/React"'
          # Ensure React-Core is linked
          config.build_settings['OTHER_LDFLAGS'] ||= ['$(inherited)']
          config.build_settings['OTHER_LDFLAGS'] << '-framework React-Core'
        end
      end
    end
  end
$1`
        );
      }

      fs.writeFileSync(podfilePath, podfileContents);
      return config;
    },
  ]);
};

module.exports = withFirebasePodfileFix;
