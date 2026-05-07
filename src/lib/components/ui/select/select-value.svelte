<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import type { SelectValueProps } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: SelectValueProps & { ref?: HTMLSpanElement | null } = $props();
</script>

<SelectPrimitive.Value bind:ref data-slot="select-value" {...restProps} />
